import { Button } from "./ui/button";
import useCartStore from "../store/useCartItems";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "./ui/select";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";
import wilayas from "../data/wilayas.json";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const formSchema = z
  .object({
    nom: z.string().min(2, {
      message: "Le nom doit comporter au moins 2 caractères.",
    }),
    prenom: z.string().min(2, {
      message: "Le prénom doit comporter au moins 2 caractères.",
    }),
    telephone: z.string().min(10, {
      message: "Le numéro de téléphone doit comporter au moins 10 chiffres.",
    }),
    wilaya: z.string(),
    commune: z.string(),
    livraison: z.enum(["AGENCY", "HAND"]),
  })
  .superRefine((input, refinementContext) => {
    if (isNaN(parseInt(input.telephone))) {
      return refinementContext.addIssue({
        path: ["telephone"],
        code: z.ZodIssueCode.custom,
        message: "Veuillez entrer un numéro de téléphone valide.",
      });
    }
    return true;
  });

export default function OrderForm() {
  const { cartItems, emptyCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      wilaya: "",
      commune: "",
      livraison: "AGENCY",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    try {
      const getTotalAmount = () => {
        let total = 0;
        cartItems.forEach((item) => {
          total += item.ProductPrice * item.ProductOrderQuantity;
        });
        return Math.round(total * 1000) / 1000;
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/make-order`,
        {
          orderInfo: {
            OrderPhone: values.telephone,
            OrderWilaya: values.wilaya,
            OrderCommune: values.commune,
            OrderFName: values.prenom,
            OrderLName: values.nom,
            OrderShippingMode: values.livraison,
            OrderAmount: getTotalAmount(),
          },
          orderProducts: cartItems.map((item) => ({
            DetailProductId: item.ProductId,
            DetailQuantity: item.ProductOrderQuantity,
            DetailProductName: item.ProductName,
            DetailProductPrice: item.ProductPrice,
            OrderSize: item.ProductSize,
          })),
        }
      );
      if (res.status === 201) {
        emptyCart();
        toast({
          title: "Commande validée",
          description: "Votre commande a été validée avec succès",
        });
      }
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite lors de la validation de la commande",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="mt-6" asChild>
          <Button
            className="w-full mt-5 bg-green-500"
            disabled={cartItems.length > 0 ? false : true}
          >
            Valider la commande
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remplissez le formulaire</DialogTitle>
            <DialogDescription>
              Remplissez ce formulaire avec sensibilité
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom/اللقب</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de famille" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prenom/الإسم</FormLabel>
                    <FormControl>
                      <Input placeholder="Prenom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de téléphone/رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input placeholder="Numero de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wilaya"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wilaya/الولاية</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisissez votre wilaya" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {wilayas.map((wilaya) => (
                              <SelectItem key={wilaya.id} value={wilaya.name}>
                                {wilaya.name}/{wilaya.ar_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commune"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commune/البلدية</FormLabel>
                    <FormControl>
                      <Input placeholder="Commune" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="livraison"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mode de livraison/التوصيل</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex gap-2">
                          <RadioGroupItem value="AGENCY" />
                          <Label>Agence/الوكالة</Label>
                        </div>
                        <div className="flex gap-2">
                          <RadioGroupItem value="HAND" />
                          <Label>Domicile/المنزل</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-green-600"
                disabled={submitted}
              >
                Valider la commande
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
