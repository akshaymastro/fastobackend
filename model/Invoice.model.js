const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  invoice_no: {
    type: String,
  },
  base_fare: {
    type: String,
  },
  vechile_charge: {
    type: String,
  },
  toll_plaza: {
    type: String,
  },
  waiting_charge: {
    type: String,
  },
  service_charge: {
    type: String,
  },
  payment_mode: {
    type: String,
  },
  promocode: {
    type: String,
  },
  total_tax: {
    type: String,
  },
  GST: {
    type: String,
  },
  Total: {
    type: String,
  },
  remaining: {
    type: String,
  },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
