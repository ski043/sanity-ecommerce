import { Dialog, Transition } from "@headlessui/react";
import { Form, Link } from "@remix-run/react";
import React, { Fragment } from "react";
import { urlFor } from "~/lib/sanityImageUrl";
import { useCartState } from "~/lib/useCart";

const ShoppingCartModal = () => {
  const data = useCartState((state) => state.cart);
  const cartState = useCartState((state) => state.showCart);
  const toggleShowCart = useCartState((state) => state.toggleShowCart);
  const removeItem = useCartState((state) => state.removeFromCart);
  const total = useCartState((state) => state.totalPrice);

  return (
    <Transition.Root show={cartState} as={Fragment}>
      <Dialog className="relative z-10" as="div" onClose={toggleShowCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacitiy-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 "
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overlfow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={toggleShowCart}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {data.length < 1 ? (
                        <div className="flex w-full h-full flex-col items-center justify-center">
                          <h1 className="text-5xl text-center">
                            Please add items to your bag!
                          </h1>
                          <button
                            onClick={toggleShowCart}
                            className="bg-indigo-600 px-4 py-2 rounded-lg text-white mt-6 text-xl"
                          >
                            Add Items
                          </button>
                        </div>
                      ) : (
                        <div className="mt-8">
                          <div>
                            <ul className="-my-6 divide-y divide-gray-200">
                              {data.map((product, idx) => (
                                <li key={idx} className="flex py-6">
                                  <div className="h-24 w-24 object-cover object-center">
                                    <img
                                      src={urlFor(product.image[0]).url()}
                                      alt="Product img"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-800">
                                        <h3>
                                          <Link
                                            to={`/product/${product.slug.current}`}
                                          >
                                            {product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          $ {product.price}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Quantity: {product.quantity}
                                      </p>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => removeItem(product)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {data.length < 1 ? null : (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>$ {total}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and tax will be calcualted at checkout
                        </p>

                        <div className="mt-6">
                          <Form method="POST" action="/buy">
                            <input
                              type="hidden"
                              name="cartData"
                              value={JSON.stringify(data)}
                            />

                            <button
                              type="submit"
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medum text-white"
                            >
                              Checkout
                            </button>
                          </Form>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ShoppingCartModal;
