import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  // To write data, you dont use useFetcher, but instead a form component that fetcher provides
  const fetcher = useFetcher();

  return (
    // Fetcher form allows you to fetch data without having to navigate to a different page
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// This will update the order in the API, should be called by default action
// Then connect this action to the correct page in App.jsx
/* dont need access to request here because this form doesnt have any inputs, its only changing
the priority key, left here to remember that we can grab that data, see the CreateOrder action */
/* React router knows the data changed because of this action, so it re fetches the data in the
background and cause a re render */
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  // Always need to return something in these loader functions
  return null;
}
