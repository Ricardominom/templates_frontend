import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "@/api/TemplateAPI";
import { useAuth } from "@/hooks/useAuth";
import { isCreator } from "@/utils/policies";
import DeleteTemplateModal from "@/components/templates/DeleteTemplateModal";

export default function DashboardView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading: authLoading } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates
  });

  if (isLoading && authLoading) return "Loading...";
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">My Templates</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Manage your templates
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/templates/create"
          >
            New Template
          </Link>
        </nav>

        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-300 border border-gray-300 mt-10 bg-white dark:bg-slate-600 shadow-lg"
          >
            {data.map((template) => (
              <li
                key={template._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <div className="mb-2">
                      {isCreator(template.creator, user._id) ? (
                        <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">
                          Creator
                        </p>
                      ) : (
                        <p className="font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5">
                          Respondent
                        </p>
                      )}
                    </div>
                    <Link
                      to={`/templates/${template._id}`}
                      className="text-gray-700 dark:text-white cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {template.title}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Creator: {template.userName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">options</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to={`/templates/${template._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Watch Template
                          </Link>
                        </Menu.Item>

                        {isCreator(template.creator, user._id) && (
                          <>
                            <Menu.Item>
                              <Link
                                to={`/templates/${template._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Edit Template
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() =>
                                  navigate(
                                    location.pathname +
                                      `?deleteTemplate=${template._id}`
                                  )
                                }
                              >
                                Delete Template
                              </button>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            There aren't templates yet {""}
            <Link
              to={"/templates/create"}
              className="text-fuchsia-500 font-bold"
            >
              Create Template
            </Link>
          </p>
        )}

        <DeleteTemplateModal />
      </>
    )
}
