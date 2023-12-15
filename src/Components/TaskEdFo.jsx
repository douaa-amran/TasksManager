import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function TaskEdFo() {
    flatpickr("#due_date", {
        dateFormat: "Y-m-d",
      });
    return (
        <>
            <div className="flex md:w-full lg:w-3/5 min-h-full flex-1 flex-col justify-center px-6 py-9 pb-20 lg:px-8 rounded-xl bg-gray-800">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-400 ">
                        Edit Task
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-8" action="#" method="POST">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-300">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 font-medium text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-300">
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 font-medium text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left"
                                />
                            </div>
                        </div>
                        <div >
                            <label htmlFor="due_date" className="block text-sm font-medium leading-6 text-gray-300">
                                Due Date
                            </label>
                            <div className="mt-2 flex">
                                <input
                                    id="due_date"
                                    name="due_date"
                                    type="date"
                                    data-date-format="Y-m-d"
                                    required
                                    className="flatpickr block w-full rounded-md border-0 py-1.5 font-medium text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
