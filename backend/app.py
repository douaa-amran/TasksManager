from flask import Flask, jsonify, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
from bson import json_util, ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB connection setup
client = MongoClient('mongodb://localhost:27017', server_api=ServerApi('1'))
db = client.TasksManagerDB
boards = db.Boards


# API endpoint to fetch boards data
@app.route('/api/boards', methods=['GET'])
def getBoards():
    cursor = boards.find()
    # Convert the cursor to a list and use json_util for serialization
    result = json_util.dumps(list(cursor))
    print(result)
    # Return the JSON response
    return result


# API endpoint to delete a board
@app.route('/api/boards/<board_id>', methods=['DELETE'])
def deleteBoard(board_id):
    # Convert the board_id to ObjectId
    id = ObjectId(board_id)
    # Delete the board with the given ID
    boards.delete_one({'_id': id})
    return jsonify({'message': 'Deleted with success'}), 200


# API endpoint to update a board
@app.route('/api/boards/<board_id>', methods=['PUT', 'PATCH'])
def updateBoard(board_id):
    # Convert the board_id to ObjectId
    id = ObjectId(board_id)
    # Get the updated data from the request body
    updated_data = request.json
    # Perform the update operation
    result = boards.update_one({'_id': id}, {'$set': updated_data})
    if result.modified_count > 0:
        return jsonify({'message': 'Updated with success'}), 200
    else:
        return jsonify({'message': 'No updates applied'}), 200


# API endpoint to add a board
@app.route('/api/boards', methods=['POST'])
def addBoard():
    try:
        # Get the data for the new board from the request body
        new_board_data = request.json

        # Insert the new board into the MongoDB collection
        result = boards.insert_one(new_board_data)

        if result.inserted_id:
            return jsonify({'message': 'Board added successfully', 'board_id': str(result.inserted_id)}), 201
        else:
            return jsonify({'message': 'Failed to add board'}), 500

    except Exception as e:
        return jsonify({'error': str(e)})


# API endpoint to fetch boards' tasks data
@app.route('/api/boards/<board_id>/tasks', methods=['GET'])
def getTasks(board_id):
    try:
        # Convert the board_id to ObjectId
        id = ObjectId(board_id)

        # Find the board with the given ID and retrieve its tasks
        board = boards.find_one({'_id': id}, {'tasks': 1})

        if board and 'tasks' in board:
            # Return the tasks of the specific board as JSON
            return json_util.dumps(board['tasks'])
        else:
            return jsonify({'message': 'Board not found or no tasks available'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# API endpoint to add a task
@app.route('/api/boards/<board_id>/tasks', methods=['POST'])
def addTask(board_id):
    try:
        # Get the data for the new task from the request body
        new_task_data = request.json
        print(new_task_data)

        # Insert the new task into the MongoDB collection
        result = boards.update_one({'_id': ObjectId(board_id)}, {'$push': {'tasks': new_task_data}})

        if result.matched_count > 0 and result.modified_count > 0:
            # Use the task_id from the new_task_data
            return jsonify({'message': 'Task added successfully', 'task_id': new_task_data.get('task_id')}), 201
        else:
            return jsonify({'message': 'Failed to add task'}), 500

    except Exception as e:
        return jsonify({'error': str(e)})


# API endpoint to update a task
@app.route('/api/boards/<board_id>/tasks/<task_id>', methods=['PATCH'])
def updateTaskStatus(board_id, task_id):
    try:
        # Convert the board_id and task_id to ObjectId
        board_oid = ObjectId(board_id)
        task_id = int(task_id)

        # Get the updated status from the request body
        updated_fields = request.json.get('payload', {})
        print(updated_fields)
        # Create an update dictionary based on the provided fields
        update_dict = {}
        
        if 'status' in updated_fields:
            update_dict['tasks.$.status'] = updated_fields['status']
        if 'task_name' in updated_fields:
            update_dict['tasks.$.task_name'] = updated_fields['task_name']
        if 'description' in updated_fields:
            update_dict['tasks.$.description'] = updated_fields['description']
        if 'due_date' in updated_fields:
            update_dict['tasks.$.due_date'] = updated_fields['due_date']
        print(update_dict)

        # Update the task in the specific board
        result = boards.update_one(
            {'_id': board_oid, 'tasks.task_id': task_id},
            {'$set': update_dict}
        )

        if result.modified_count > 0:
            return jsonify({'message': 'Task updated with success'}), 200
        else:
            return jsonify({'message': 'No updates applied'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# API endpoint to delete a task
@app.route('/api/boards/<board_id>/tasks/<task_id>', methods=['DELETE'])
def deleteTask(board_id, task_id):
    try:
        # Convert the board_id and task_id to ObjectId
        board_oid = ObjectId(board_id)
        task_id = int(task_id)

        # Delete the task of the specific id inside the specific board
        result = boards.update_one(
            {'_id': board_oid},
            {'$pull': {'tasks': {'task_id': task_id}}}
        )

        if result.modified_count > 0:
            return jsonify({'message': 'Task status updated with success'}), 200
        else:
            return jsonify({'message': 'No updates applied'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
        

if __name__ == '__main__':
    app.run(debug=True)