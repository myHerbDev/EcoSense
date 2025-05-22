import type { Invoice } from "@/types/payment"
import { formatCurrency } from "./paypal-client"

// Function to generate an invoice
export function generateInvoice(invoice: Invoice): Invoice {
  // In a real application, you would use a library like PDFKit to generate a PDF invoice
  // For this example, we'll just return the invoice data
  return invoice
}

// Function to generate an HTML invoice
export function generateInvoiceHtml(invoice: Invoice): string {
  const totalAmount = invoice.amount
  const formattedDate = new Date(invoice.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice #${invoice.id}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
          border-collapse: collapse;
        }
        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }
        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }
        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
        }
        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }
        .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
        }
        .invoice-box table tr.details td {
          padding-bottom: 20px;
        }
        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
        }
        .invoice-box table tr.item.last td {
          border-bottom: none;
        }
        .invoice-box table tr.total td:nth-child(3) {
          border-top: 2px solid #eee;
          font-weight: bold;
        }
        .carbon-offset {
          margin-top: 20px;
          padding: 10px;
          background-color: #e8f5e9;
          border-radius: 5px;
          color: #2e7d32;
        }
        @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }
          .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <table>
          <tr class="top">
            <td colspan="3">
              <table>
                <tr>
                  <td class="title">
                    EcoSense
                  </td>
                  <td style="text-align: right;">
                    Invoice #: ${invoice.id}<br>
                    Created: ${formattedDate}<br>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="information">
            <td colspan="3">
              <table>
                <tr>
                  <td>
                    EcoSense, Inc.<br>
                    123 Green Street<br>
                    Eco City, EC 12345
                  </td>
                  <td style="text-align: right;">
                    ${invoice.customerName}<br>
                    ${invoice.customerEmail}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="heading">
            <td>Payment Method</td>
            <td></td>
            <td style="text-align: right;">Status</td>
          </tr>
          <tr class="details">
            <td>${invoice.paymentMethod}</td>
            <td></td>
            <td style="text-align: right;">${invoice.status}</td>
          </tr>
          <tr class="heading">
            <td>Item</td>
            <td style="text-align: right;">Quantity</td>
            <td style="text-align: right;">Price</td>
          </tr>
          ${invoice.items
            .map(
              (item, index) => `
            <tr class="item ${index === invoice.items.length - 1 ? "last" : ""}">
              <td>${item.description}</td>
              <td style="text-align: right;">${item.quantity}</td>
              <td style="text-align: right;">${formatCurrency(item.amount)}</td>
            </tr>
          `,
            )
            .join("")}
          <tr class="total">
            <td></td>
            <td></td>
            <td style="text-align: right;">Total: ${formatCurrency(totalAmount)}</td>
          </tr>
        </table>
        <div class="carbon-offset">
          <strong>Carbon Offset Contribution:</strong> ${formatCurrency(invoice.carbonOffset)} (1% of your payment) has been allocated to carbon footprint reduction initiatives.
        </div>
      </div>
    </body>
    </html>
  `
}
