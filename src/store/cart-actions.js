import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data..",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `https://expense-tracker-react-e56d7-default-rtdb.firebaseio.com/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Send Cart Data failed!!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent Cart Data Successfully!",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Send Cart Data Failed!",
        })
      );
    }
  };
};

export const getCartData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://expense-tracker-react-e56d7-default-rtdb.firebaseio.com/cart.json`
      );
      if (!response.ok) {
        throw new Error("Send Cart Data failed!!");
      }
      return await response.json();
    };

    try {
      const data = await sendRequest();
      console.log("data from api>>>", data);
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Send Cart Data Failed!",
        })
      );
    }
  };
};
