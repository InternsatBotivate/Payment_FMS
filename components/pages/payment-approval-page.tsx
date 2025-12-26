"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, X, Eye, Check, XCircle } from "lucide-react"

interface ApprovalRequest {
  id: string
  status: string
  uniqueNo: string
  fmsName: string
  payTo: string
  amount: number
  remarks: string
}

export function PaymentApprovalPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending")
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [approvalStatus, setApprovalStatus] = useState<"approve" | "reject">("approve")
  const [approvalRemarks, setApprovalRemarks] = useState("")

  const [pendingRequests, setPendingRequests] = useState<ApprovalRequest[]>([
    { id: "1", status: "Pending", uniqueNo: "REQ-001", fmsName: "Finance Division", payTo: "Vendor A", amount: 50000, remarks: "Office supplies" },
    { id: "2", status: "Pending", uniqueNo: "REQ-002", fmsName: "HR Department", payTo: "Salary Provider", amount: 150000, remarks: "Monthly salary" },
  ])

  const [historyRequests, setHistoryRequests] = useState<ApprovalRequest[]>([
    { id: "3", status: "Approved", uniqueNo: "REQ-003", fmsName: "IT Department", payTo: "Software Vendor", amount: 75000, remarks: "License renewal" },
  ])

  const handleProcess = (request: ApprovalRequest) => {
    setSelectedRequest(request)
    setShowModal(true)
  }

  const handleSubmitApproval = () => {
    if (!selectedRequest) return
    const updatedRequest: ApprovalRequest = { ...selectedRequest, status: approvalStatus === "approve" ? "Approved" : "Rejected" }
    setPendingRequests(pendingRequests.filter((r) => r.id !== selectedRequest.id))
    setHistoryRequests([updatedRequest, ...historyRequests])
    setShowModal(false)
    setSelectedRequest(null)
    setApprovalRemarks("")
    setApprovalStatus("approve")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Payment Approval</h1>
        <p className="text-gray-500 mt-1">Review and approve pending payment requests</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-sky-50 rounded-xl w-fit">
        <button onClick={() => setActiveTab("pending")} className={`px-5 py-2.5 font-medium rounded-lg transition-all duration-200 ${activeTab === "pending" ? "bg-white text-sky-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
          Pending ({pendingRequests.length})
        </button>
        <button onClick={() => setActiveTab("history")} className={`px-5 py-2.5 font-medium rounded-lg transition-all duration-200 ${activeTab === "history" ? "bg-white text-sky-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
          History ({historyRequests.length})
        </button>
      </div>

      {activeTab === "pending" && (
        <Card className="overflow-hidden p-0 bg-white">
          <table className="w-full">
            <thead className="bg-sky-50 border-b border-sky-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unique No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">FMS Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pay To</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((req, i) => (
                <tr key={req.id} className={`border-b border-gray-100 hover:bg-sky-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-4"><span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">{req.status}</span></td>
                  <td className="px-6 py-4 text-sm font-semibold text-sky-600">{req.uniqueNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{req.fmsName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{req.payTo}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">₹{req.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleProcess(req)}>
                        <Eye size={14} />
                        Review
                      </Button>
                    </div>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">FMS Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pay To</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {historyRequests.map((req, i) => (
                <tr key={req.id} className={`border-b border-gray-100 hover:bg-sky-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${req.status === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-sky-600">{req.uniqueNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{req.fmsName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{req.payTo}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">₹{req.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-2xl bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-lg shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Process Approval</h2>
                    <p className="text-sm text-gray-500">{selectedRequest.uniqueNo}</p>
                  </div>
                </div>
                <button onClick={() => { setShowModal(false); setSelectedRequest(null) }} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-sky-50 rounded-xl">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Pay To:</span> <span className="font-medium">{selectedRequest.payTo}</span></div>
                    <div><span className="text-gray-500">Amount:</span> <span className="font-bold text-sky-600">₹{selectedRequest.amount.toLocaleString()}</span></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                  <Select value={approvalStatus} onValueChange={(value: any) => setApprovalStatus(value)}>
                    <SelectTrigger className="h-11 bg-white border-sky-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approve">✓ Approve</SelectItem>
                      <SelectItem value="reject">✗ Reject</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                  <Textarea value={approvalRemarks} onChange={(e) => setApprovalRemarks(e.target.value)} placeholder="Enter remarks" rows={3} className="bg-white border-sky-200" />
                </div>

                {/* Modal Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Button onClick={handleSubmitApproval} size="lg" className="flex-1" variant={approvalStatus === "approve" ? "success" : "destructive"}>
                    {approvalStatus === "approve" ? <Check size={18} /> : <XCircle size={18} />}
                    {approvalStatus === "approve" ? "Approve Request" : "Reject Request"}
                  </Button>
                  <Button onClick={() => { setShowModal(false); setSelectedRequest(null); setApprovalRemarks(""); setApprovalStatus("approve") }} variant="outline" size="lg">
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
