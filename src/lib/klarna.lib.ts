interface OrderLine {
  reference: string
  name: string
  quantity: number
  unit_price: number
  total_amount: number
  tax_rate: number
}

async function initiatePayment(orderLine: OrderLine, basicAuth: String) {
  /* Initiate the Klarna Session */
  return { orderLine, basicAuth }
}

const Klarna = {
  initiatePayment
}

export default Klarna
