import React, { useState } from "react";
import { Card, CardContent } from "../../components/Card";
import { Switch } from "../../components/Switch";
import { Button } from "../../components/Button";
import { Lock, CloudUpload, CloudDownload, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";

export const Security = () => {
  const [gdprCompliance, setGdprCompliance] = useState(false);
  const [dataRetention, setDataRetention] = useState(false);
  const [retentionPeriod, setRetentionPeriod] = useState("4 years");
  const [backupFrequency, setBackupFrequency] = useState("weekly");

  return (
    <div className="space-y-6">
      {/* Data security & Privacy */}
      <div>
        <Card className="rounded-xl border border-[#0000008c] shadow p-10">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-gray-600" />
            <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base">
              Data security & Privacy
            </h3>
          </div>
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000a6] text-sm mb-8">
            Safeguards for sensitive user information and compliance
          </p>

          <div className="flex flex-col gap-[60px]">
            {/* Data Encryption */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                    Data Encryption
                  </h4>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                    AES-256 encryption for sensitive user data
                  </p>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-0 border-t border-[#0000001a] mt-[60px]" />
            </div>

            {/* GDPR/MOH Compliance */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                    GDPR/MOH Compliance
                  </h4>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                    Ensure data privacy laws & regulations
                  </p>
                </div>
                <Switch
                  checked={gdprCompliance}
                  onCheckedChange={setGdprCompliance}
                />
              </div>
              <div className="h-0 border-t border-[#0000001a] mt-[60px]" />
            </div>

            {/* Data Retention Policy */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                    Data Retention Policy
                  </h4>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                    Duration before data archival or deletion
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={retentionPeriod} onValueChange={setRetentionPeriod}>
                    <SelectTrigger className="w-[130px] h-[35px] rounded-[5px] border border-[#0000004d] text-[13px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 year">1 year</SelectItem>
                      <SelectItem value="2 years">2 years</SelectItem>
                      <SelectItem value="4 years">4 years</SelectItem>
                      <SelectItem value="7 years">7 years</SelectItem>
                    </SelectContent>
                  </Select>
                  <Switch
                    checked={dataRetention}
                    onCheckedChange={setDataRetention}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* System Backup Frequency */}
      <div>
        <Card className="rounded-xl border border-[#0000008c] shadow p-10">
          <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-base mb-8">
            System Backup Frequency
          </h3>

          <div className="flex flex-col gap-6">
            {/* Automatic Backup Frequency */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-[13px] mb-2">
                    Automatic Backup Frequency
                  </h4>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px]">
                    Schedule for system-wide backups
                  </p>
                </div>
                <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                  <SelectTrigger className="w-[130px] h-[35px] rounded-[5px] border border-[#0000004d] text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Last backup */}
            <div>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-[13px] mb-2">
                Last backup:
              </p>
              <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#000000] text-sm">
                October 23, 2005 at 03:00 AM
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <Button className="bg-[#001240] text-white hover:bg-[#001240]/90 h-auto px-4 py-2 rounded-[3px] [font-family:'Poppins',Helvetica] font-medium text-sm">
                <CloudUpload className="w-4 h-4 mr-2" />
                Backup now
              </Button>
              <Button
                variant="outline"
                className="border border-[#0000004c] h-auto px-4 py-2 rounded-[3px] [font-family:'Poppins',Helvetica] font-medium text-sm"
              >
                <CloudDownload className="w-4 h-4 mr-2" />
                Restore from backup
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

