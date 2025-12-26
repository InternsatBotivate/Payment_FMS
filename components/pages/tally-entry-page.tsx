"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ListChecks, Send, X } from "lucide-react"

interface TallyEntry {
  id: string
  status: string
  uniqueNo: string
  payTo: string
  approvedAmount: number
  paymentType: string
  remarks: string
}

export function TallyEntryPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [pendingEntries, setPendingEntries] = useState<TallyEntry[]>([
    { id: "1", status: "Paid", uniqueNo: "REQ-001", payTo: "Vendor A", approvedAmount: 50000, paymentType: "Bank", remarks: "Office supplies" },
    { id: "2", status: "Paid", uniqueNo: "REQ-002", payTo: "Salary Provider", approvedAmount: 150000, paymentType: "Bank", remarks: "Monthly salary" },
    { id: "3", status: "Paid", uniqueNo: "REQ-003", payTo: "Software Vendor", approvedAmount: 75000, paymentType: "UPI", remarks: "License renewal" },
  ])

  const [historyEntries, setHistoryEntries] = useState<TallyEntry[]>([
    { id: "4", status: "Processed", uniqueNo: "REQ-004", payTo: "Utility Provider", approvedAmount: 25000, paymentType: "Cash", remarks: "Electricity bills" },
  ])

  const handleSelectAll = (checked: boolean) => { setSelectedIds(checked ? pendingEntries.map((e) => e.id) : []) }
  const handleSelectEntry = (id: string, checked: boolean) => { setSelectedIds(checked ? [...selectedIds, id] : selectedIds.filter((sid) => sid !== id)) }

  const handleSubmitEntries = () => {
    const entriesToMove = pendingEntries.filter((e) => selectedIds.includes(e.id))
    const updatedEntries = entriesToMove.map((e) => ({ ...e, status: "Processed" }))
    setPendingEntries(pendingEntries.filter((e) => !selectedIds.includes(e.id)))
    setHistoryEntries([...updatedEntries, ...historyEntries])
    setSelectedIds([])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Tally Entry</h1>
        <p className="text-gray-500 mt-1">Process and submit tally entries</p>
      </div>

      <div className="flex gap-1 p-1 bg-sky-50 rounded-xl w-fit">
        <button onClick={() => setActiveTab("pending")} className={`px-5 py-2.5 font-medium rounded-lg transition-all ${activeTab === "pending" ? "bg-white text-sky-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}>Pending ({pendingEntries.length})</button>
        <button onClick={() => setActiveTab("history")} className={`px-5 py-2.5 font-medium rounded-lg transition-all ${activeTab === "history" ? "bg-white text-sky-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}>History ({historyEntries.length})</button>
      </div>

      {activeTab === "pending" && (
        <>
          <Card className="overflow-hidden p-0 bg-white">
            <table className="w-full">
              <thead className="bg-sky-50 border-b border-sky-100">
                <tr>
                  <th className="px-6 py-4 text-left"><Checkbox checked={selectedIds.length === pendingEntries.length && pendingEntries.length > 0} onCheckedChange={handleSelectAll} className="border-sky-300 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500" /></th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unique No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pay To</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {pendingEntries.map((entry, i) => (
                  <tr key={entry.id} className={`border-b border-gray-100 transition-colors ${selectedIds.includes(entry.id) ? 'bg-sky-50' : i % 2 === 0 ? 'bg-white hover:bg-sky-50/50' : 'bg-gray-50/50 hover:bg-sky-50/50'}`}>
                    <td className="px-6 py-4"><Checkbox checked={selectedIds.includes(entry.id)} onCheckedChange={(checked) => handleSelectEntry(entry.id, !!checked)} className="border-sky-300 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500" /></td>
                    <td className="px-6 py-4"><span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">{entry.status}</span></td>
                    <td className="px-6 py-4 text-sm font-semibold text-sky-600">{entry.uniqueNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{entry.payTo}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">₹{entry.approvedAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{entry.paymentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Action Buttons */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl border border-sky-100">
              <span className="text-sm text-gray-600">
                <span className="font-bold text-sky-600">{selectedIds.length}</span> item{selectedIds.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={() => setSelectedIds([])}>
                  <X size={16} />
                  Clear
                </Button>
                <Button onClick={handleSubmitEntries} variant="success" size="lg">
                  <Send size={18} />
                  Submit to Tally
                </Button>
              </div>
            </div>
          )}
        </>
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
              {historyEntries.map((entry, i) => (
                <tr key={entry.id} className={`border-b border-gray-100 hover:bg-sky-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-4"><span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">{entry.status}</span></td>
                  <td className="px-6 py-4 text-sm font-semibold text-sky-600">{entry.uniqueNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.payTo}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">₹{entry.approvedAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.paymentType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
