"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utility/api";

export default function Contact() {
  const [contactHeader, setContactHeader] = useState("");
  const [tagline, setTagline] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactId, setContactId] = useState(null);
  const [contactButtonText, setContactButtonText] = useState("Save Contact");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      header: contactHeader,
      tagline: tagline,
      phone: phoneNumber,
      address: address,
      email: email,
    };
    if (contactButtonText === "Save Contact") {
      const response = await api.saveContactDetails(contactData);
      console.log(response);
    } else if (contactButtonText === "Update Contact") {
      const response = await api.updateContactDetails(contactData, contactId);
      console.log(response);
    }
  };

  async function fetchContactDetails() {
    const response = await api.getContactDetails();
    if (response.length > 0) {
      setContactHeader(response[0].HEADER);
      setTagline(response[0].TAGLINE);
      setPhoneNumber(response[0].PHONE_NUMBER);
      setAddress(response[0].ADDRESS);
      setEmail(response[0].EMAIL);
      setContactId(response[0].ID);
      setContactButtonText("Update Contact");
    } else {
      setContactButtonText("Save Contact");
    }
  }

  useEffect(() => {
    fetchContactDetails();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        {/* Header Input */}
        <div className="space-y-2">
          <Label htmlFor="header">Contact Header</Label>
          <Input
            id="header"
            value={contactHeader}
            onChange={(e) => setContactHeader(e.target.value)}
            placeholder="Enter contact header"
            required
          />
        </div>

        {/* Tagline Input */}
        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Enter tagline"
            required
          />
        </div>

        {/* Phone Number Input */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Address Input */}
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="flex justify-between">
          <Button type="submit" className="w-full">
            {contactButtonText}
          </Button>
        </div>
      </form>
    </div>
  );
}
