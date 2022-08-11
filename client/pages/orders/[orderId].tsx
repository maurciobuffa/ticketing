import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useRequest } from "../../hooks/useRequest";

const OrderPage = ({ order, currentUser }) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => router.push("/orders")
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      const secondsLeft = Math.round(msLeft / 1000);
      setTimeLeft(secondsLeft);
    };

    findTimeLeft();
    const timeId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51IxbmFJyuDR2DWzPqeqD0rhzGozpALJBnGt3cH2g794dU2i49ejDtRuGrAftmvEvzOAxaJeuc2lqpGhJ4bt9Okup00j2qBz01S"
        amount={order?.ticket?.price * 100}
        email={currentUser?.email}
      />
    </div>
  );
};

OrderPage.getInitialProps = async (context, client, currentUser) => {
  const { orderId } = context.query;
  const { data } = await client.get("/api/orders/" + orderId);
  return { order: data };
};

export default OrderPage;
