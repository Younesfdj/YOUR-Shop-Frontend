"use client";

import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CartSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const { toast } = useToast();
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">
            {totalPrice} {"DZD"}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">400 DZD</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {subTotalPrice} {"DZD"}
          </dd>
        </div>
      </dl>
      <Button
        onClick={() => setIsLoading(true)}
        className="w-full"
        disabled={isLoading}
      >
        Checkout
      </Button>
    </section>
  );
}
