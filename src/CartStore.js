import { atom, useAtom } from 'jotai';
import axios from 'axios';
import Immutable from "seamless-immutable";
import { useEffect } from "react";
import { useJwt } from "./UserStore";

const initialCart = Immutable([]);

export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
    const { getJwt } = useJwt();

    const updateCart = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const updatedCartItems = cart.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
            }));
            console.log(updatedCartItems)
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cart`,
                { cartItems: updatedCartItems },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
        } catch (error) {
            console.error("Error updating cart:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Update cart on the backend whenever the cart changes
    useEffect(() => {
        if (cart !== initialCart) {
            updateCart();
        }
    }, [cart]); // Depend on the cart state

    const modifyCart = (product_id, quantity) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex(
                (item) => item.product_id === product_id
            );
            if (existingItemIndex !== -1) {
                if (quantity >= 1) {
                    return currentCart.setIn(
                        [existingItemIndex, "quantity"],
                        quantity
                    );
                } else {
                    return currentCart.filter(
                        (item) => item.product_id !== product_id
                    );
                }
            }
            return currentCart;
        });
    };

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex(
                (item) => item.product_id === product.id
            );
            if (existingItemIndex !== -1) {
                return currentCart.setIn(
                    [existingItemIndex, "quantity"],
                    currentCart[existingItemIndex].quantity + 1
                );
            } else {
                const newCartItem = {
                    ...product,
                    product_id: product.id,
                    id: Math.floor(Math.random() * 10000 + 1),
                    quantity: 1,
                };
                return currentCart.concat(newCartItem);
            }
        });
    };

    const deleteCartItem = (product_id) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.product_id !== product_id)
        );
    };

    const fetchCart = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            setCart(Immutable(response.data));
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCart = () => cart;   
    
    const getCartTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);



    return {
        getCart,
        getCartTotal,
        addToCart,
        modifyCart,
        deleteCartItem,
        fetchCart,
        isLoading,
    };
};
