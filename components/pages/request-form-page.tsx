"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, FileText } from "lucide-react"

interface Request {
  id: string
  status: string
  uniqueNo: string
  fmsName: string
  payTo: string
  amount: number
  remarks: string
  attachment?: string
}

export function RequestFormPage() {
  const [fmsName, setFmsName] = useState("")
  const [payTo, setPayTo] = useState("")
  const [amount, setAmount] = useState("")
  const [remarks, setRemarks] = useState("")
  const [fileName, setFileName] = useState("")
  const [uniqueNo, setUniqueNo] = useState("")
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      status: "Pending",
      uniqueNo: "REQ-001",
      fmsName: "Finance Division",
      payTo: "Vendor A",
      amount: 50000,
      remarks: "Office supplies",
      attachment: "invoice.pdf",
    },
    {
      id: "2",
      status: "Approved",
      uniqueNo: "REQ-002",
      fmsName: "HR Department",
      payTo: "Salary Provider",
      amount: 150000,
      remarks: "Monthly salary",
      attachment: "salary.pdf",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fmsName || !payTo || !amount || !uniqueNo) {
      alert("Please fill in all required fields")
      return
    }

    const newRequest: Request = {
      id: String(requests.length + 1),
      status: "Pending",
      uniqueNo: uniqueNo,
      fmsName,
      payTo,
      amount: Number.parseFloat(amount),
      remarks,
      attachment: fileName || undefined,
    }

    setRequests([newRequest, ...requests])
    setFmsName("")
    setPayTo("")
    setAmount("")
    setRemarks("")
    setFileName("")
    setUniqueNo("")
  }

  const handleDelete = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Request Form</h1>
        <p className="text-gray-500">Submit new payment requests</p>
      </div>

      {/* Form Card */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-lg shadow-md shadow-sky-200">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Submit New Request</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unique No *</label>
              <Input
                value={uniqueNo}
                onChange={(e) => setUniqueNo(e.target.value)}
                placeholder="Enter unique number"
                className="h-11 bg-sky-50/50 border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">FMS Name *</label>
              <Input 
                value={fmsName} 
                onChange={(e) => setFmsName(e.target.value)} 
                placeholder="Enter FMS Name" 
                className="h-11 bg-sky-50/50 border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay To *</label>
              <Input 
                value={payTo} 
                onChange={(e) => setPayTo(e.target.value)} 
                placeholder="Enter recipient name" 
                className="h-11 bg-sky-50/50 border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Be Paid *</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="h-11 bg-sky-50/50 border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>
              <Input 
                type="file" 
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} 
                className="h-11 bg-sky-50/50 border-sky-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter additional remarks"
              rows={3}
              className="bg-sky-50/50 border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" size="lg">
              <Plus size={18} />
              Submit Request
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setFmsName("")
                setPayTo("")
                setAmount("")
                setRemarks("")
                setFileName("")
                setUniqueNo("")
              }}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </Card>

      {/* Table Card */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Submitted Requests</h2>
        <Card className="overflow-hidden p-0 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sky-50 border-b border-sky-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unique No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">FMS Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pay To</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Remarks</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Attachment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, index) => (
                  <tr 
                    key={req.id} 
                    className={`border-b border-gray-100 hover:bg-sky-50/50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          req.status === "Pending" 
                            ? "bg-amber-100 text-amber-700" 
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-sky-600">{req.uniqueNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{req.fmsName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{req.payTo}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">₹{req.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{req.remarks || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{req.attachment || "-"}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(req.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
