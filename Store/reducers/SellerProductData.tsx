export default function SellersProductData(state: [], action: any): any {
  switch (action.type) {
    case "sellersProductData":
      return action.payload.data;
    default:
      return state || null;
  }
}
