"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, X, Send, Eye } from "lucide-react"

interface PaymentRecord {
  id: string
  status: string
  uniqueNo: string
  fmsName: string
  payTo: string
  approvedAmount: number
  remarks: string
  paymentType?: string
}

export function MakePaymentPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending")
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [paymentType, setPaymentType] = useState("cash")
  const [proofFile, setProofFile] = useState("")

  const [pendingPayments, setPendingPayments] = useState<PaymentRecord[]>([
    { id: "1", status: "Approved", uniqueNo: "REQ-001", fmsName: "Finance Division", payTo: "Vendor A", approvedAmount: 50000, remarks: "Office supplies" },
    { id: "2", status: "Approved", uniqueNo: "REQ-002", fmsName: "HR Department", payTo: "Salary Provider", approvedAmount: 150000, remarks: "Monthly salary" },
  ])

  const [historyPayments, setHistoryPayments] = useState<PaymentRecord[]>([
    { id: "3", status: "Paid", uniqueNo: "REQ-003", fmsName: "IT Department", payTo: "Software Vendor", approvedAmount: 75000, remarks: "License renewal", paymentType: "Bank" },
  ])

  const handleProcess = (payment: PaymentRecord) => { setSelectedPayment(payment); setShowModal(true) }

  const handleSubmitPayment = () => {
    if (!selectedPayment) return
    const updatedPayment: PaymentRecord = { ...selectedPayment, status: "Paid", paymentType }
    setPendingPayments(pendingPayments.filter((p) => p.id !== selectedPayment.id))
    setHistoryPayments([updatedPayment, ...historyPayments])
    setShowModal(false); setSelectedPayment(null); setPaymentType("cash"); setProofFile("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Make Payment</h1>
        <p className="text-gray-500 mt-1">Process approved payment requests</p>
      </div>

      <div className="flex gap-1 p-1 bg-sky-50 rounded-xl w-fit">
        <button onClick={() => setActiveTab("pending")} className={`px-5 py-2.5 font-medium rounded-lg transition-all ${activeTab === "pending" ? "bg-white text-sky-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}>Pending ({pendingPayments.length})</button>
        <button onClick={() => setActiveTab("history")} className={`px-5 py-2.5 font-medium rounded-lg transition-all ${activeTab === "history" ? "bg-white text-sky-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}>History ({historyPayments.length})</button>
      </div>

      {activeTab === "pending" && (
        <Card className="overflow-hidden p-0 bg-white">
          <table className="w-full">
            <thead className="bg-sky-50 border-b border-sky-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unique No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pay To</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((payment, i) => (
                <tr key={payment.id} className={`border-b border-gray-100 hover:bg-sky-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-4"><span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">{payment.status}</span></td>
                  <td className="px-6 py-4 text-sm font-semibold text-sky-600">{payment.uniqueNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.payTo}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">₹{payment.approvedAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Button size="sm" onClick={() => handleProcess(payment)}>
                      <CreditCard size={14} />
                      Pay Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "history" && (
        <Card className="overflow-hidden p-0 bg-white">
          <table className="w-full">
            <thead className="bg-sky-50 border-b border-sky-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unique No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pay To</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {historyPayments.map((payment, i) => (
                <tr key={payment.id} className={`border-b border-gray-100 hover:bg-sky-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-4"><span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">{payment.status}</span></td>
                  <td className="px-6 py-4 text-sm font-semibold text-sky-600">{payment.uniqueNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.payTo}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">₹{payment.approvedAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.paymentType || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-2xl bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-lg"><CreditCard className="w-5 h-5 text-white" /></div>
                  <div><h2 className="text-lg font-bold text-gray-800">Process Payment</h2><p className="text-sm text-gray-500">{selectedPayment.uniqueNo}</p></div>
                </div>
                <button onClick={() => { setShowModal(false); setSelectedPayment(null) }} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} className="text-gray-400" /></button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount to Pay</span>
                    <span className="text-2xl font-bold text-emerald-600">₹{selectedPayment.approvedAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">💵 Cash</SelectItem>
                      <SelectItem value="bank">🏦 Bank Transfer</SelectItem>
                      <SelectItem value="upi">📱 UPI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Proof (Optional)</label>
                  <Input type="file" onChange={(e) => setProofFile(e.target.files?.[0]?.name || "")} className="h-11" />
                </div>

                {/* Modal Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Button onClick={handleSubmitPayment} size="lg" variant="success" className="flex-1">
                    <Send size={18} />
                    Confirm Payment
                  </Button>
                  <Button onClick={() => { setShowModal(false); setSelectedPayment(null) }} variant="outline" size="lg">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
