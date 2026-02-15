export function getUserPaymentInfo(id: string) {
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      key: "6452e350-805d-4519-93d8-0bbf04023792",
      client_txn_id: id,
    }),
  };
  fetch(
    `${process.env.REACT_APP_APIBASE}/api/payment/check-order-status`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result, "result");
    })
    .catch((error) => console.log("error", error));
}
