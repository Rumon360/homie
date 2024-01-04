"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

import useRentModal from "@/hooks/useRentModal";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RentBodyContent from "./RentBodyContent";
import Heading from "./Heading";
import { ScrollArea } from "../ui/scroll-area";
import { categories } from "../navbar/Categories";
import CategoryInput from "../CategoryInput";
import { cn } from "@/lib/utils";
import CountrySelect from "../CountrySelect";
import Counter from "../Counter";
import ImageUpload from "../ImageUpload";
import { Input } from "../ui/input";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal() {
  const { isOpen, toggle } = useRentModal();
  const [steps, setSteps] = useState(STEPS.CATEGORY);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z.object({
    category: z.string().min(3, { message: "You must select a category" }),
    location: z.any(),
    guestCount: z
      .number()
      .min(1, { message: "You must atleast allow one guest" })
      .max(20, { message: "Guest must be less than or equal to 20" }),
    roomCount: z
      .number()
      .min(1, { message: "You must atleast have one room" })
      .max(20, { message: "Rooms must be less than or equal to 20" }),
    bathroomCount: z
      .number()
      .min(1, { message: "You must atleast have one bathroom" })
      .max(20, { message: "Bathrooms must be less than or equal to 20" }),
    imageSrc: z.string().min(5, { message: "You need to upload a image" }),
    price: z.number().min(1),
    title: z.string().min(5, { message: "Title should be longer" }).max(30),
    description: z
      .string()
      .min(5, { message: "Description should be longer" })
      .max(200),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = form.watch("category");
  const location = form.watch("location");
  const guestCount = form.watch("guestCount");
  const roomCount = form.watch("roomCount");
  const bathroomCount = form.watch("bathroomCount");
  const imageSrc = form.watch("imageSrc");
  const title = form.watch("title");
  const desc = form.watch("description");
  const price = form.watch("price");

  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    axios
      .post("/api/listings", values)
      .then(() => {
        toast({
          title: "Success",
          description: "Listing Created successfully!",
          variant: "success",
        });
        router.refresh();
        form.reset();
        setSteps(STEPS.CATEGORY);
        toggle();
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const onBack = () => {
    setSteps((val) => val - 1);
  };

  const onNext = () => {
    setSteps((val) => val + 1);
  };

  let bodyContent = (
    <>
      <Heading
        titleBefore="Which of these best describes your"
        title="place?"
        subtitle="Pick a category"
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ScrollArea>
                <div className="grid grid-cols-2  max-h-[50vh] gap-2">
                  {categories.map((item) => (
                    <div key={item.label} className="w-[100%]">
                      <CategoryInput
                        onClick={(category) =>
                          setCustomValue("category", category)
                        }
                        label={item.label}
                        selected={category === item.label}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </FormControl>

            <FormMessage className="pt-2 text-center" />
          </FormItem>
        )}
      />
      <DialogFooter>
        <Button
          type="button"
          onClick={() => {
            form.trigger("category");
            const check = form.getFieldState("category");
            if (!check.isDirty || check.invalid) return;
            onNext();
          }}
          className="w-full"
        >
          Next
        </Button>
      </DialogFooter>
    </>
  );

  if (steps === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          titleBefore="Where is your place"
          title="located?"
          subtitle="Help guests find you!"
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CountrySelect
                  value={location}
                  onChange={(value) => setCustomValue("location", value)}
                />
              </FormControl>
              <FormMessage className="pt-2 text-center" />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <div
            onClick={() => {
              onBack();
            }}
            className={cn(
              "w-full border-neutral-500 border cursor-pointer bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            Go back
          </div>

          <Button
            type="button"
            onClick={() => {
              if (!location || !location.value) {
                form.setError("location", {
                  type: "manual",
                  message: "Location is required",
                });
                return; // Stop submission
              }
              onNext();
            }}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          titleBefore="Share some basics about your"
          title="place"
          subtitle="What amenities do you have?"
        />
        <FormField
          control={form.control}
          name="guestCount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Counter
                  value={guestCount}
                  title="Guests"
                  subtitle="How many guests to you allow?"
                  onChange={(value) => {
                    setCustomValue("guestCount", value);
                  }}
                />
              </FormControl>
              <FormMessage className="pt-2 text-center" />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="roomCount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Counter
                  value={roomCount}
                  title="Rooms"
                  subtitle="How many rooms Do you have?"
                  onChange={(value) => {
                    setCustomValue("roomCount", value);
                  }}
                />
              </FormControl>
              <FormMessage className="pt-2 text-center" />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="bathroomCount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Counter
                  value={bathroomCount}
                  title="Bathrooms"
                  subtitle="How many bathrooms do you have?"
                  onChange={(value) => {
                    setCustomValue("bathroomCount", value);
                  }}
                />
              </FormControl>
              <FormMessage className="pt-2 text-center" />
            </FormItem>
          )}
        />
        <DialogFooter>
          <div
            onClick={() => {
              onBack();
            }}
            className={cn(
              "w-full border-neutral-500 border cursor-pointer bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            Go back
          </div>
          <Button
            type="button"
            onClick={() => {
              form.trigger(["guestCount", "roomCount", "bathroomCount"]);
              const bCount = form.getFieldState("bathroomCount");
              const rCount = form.getFieldState("roomCount");
              const gCount = form.getFieldState("guestCount");

              if (bCount.invalid) return;
              if (rCount.invalid) return;
              if (gCount.invalid) return;
              onNext();
            }}
            className="w-full"
          >
            Next
          </Button>
        </DialogFooter>
      </div>
    );
  }

  if (steps === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          titleBefore="Add a photo of your"
          title="place"
          subtitle="Show guests what your place looks like!"
        />
        <FormField
          control={form.control}
          name="imageSrc"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  value={imageSrc}
                  onChange={(value) => setCustomValue("imageSrc", value)}
                />
              </FormControl>
              <FormMessage className="pt-2 text-center" />
            </FormItem>
          )}
        />
        <DialogFooter>
          <div
            onClick={() => {
              onBack();
            }}
            className={cn(
              "w-full border-neutral-500 border cursor-pointer bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            Go back
          </div>
          <Button
            type="button"
            onClick={() => {
              form.trigger("imageSrc");
              const imgCheck = form.getFieldState("imageSrc");

              if (!imgCheck.isDirty || imgCheck.invalid) return;

              onNext();
            }}
            className="w-full"
          >
            Next
          </Button>
        </DialogFooter>
      </div>
    );
  }

  if (steps === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          titleBefore="How would you describe your"
          title="place?"
          subtitle="Short and sweet works best!"
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  value={title}
                  onChange={(e) => setCustomValue("title", e.target.value)}
                  type="text"
                  id="title"
                  placeholder="title..."
                />
              </FormControl>
              <FormMessage className="pt-2 text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  value={desc}
                  onChange={(e) =>
                    setCustomValue("description", e.target.value)
                  }
                  id="desc"
                  type="text"
                  placeholder="description..."
                />
              </FormControl>
              <FormMessage className="pt-2 text-center" />
            </FormItem>
          )}
        />
        <DialogFooter>
          <div
            onClick={() => {
              onBack();
            }}
            className={cn(
              "w-full border-neutral-500 border cursor-pointer bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            Go back
          </div>
          <Button
            type="button"
            onClick={() => {
              form.trigger(["title", "description"]);
              const desc = form.getFieldState("description");
              const title = form.getFieldState("title");

              if (!desc.isDirty || desc.invalid) return;
              if (!title.isDirty || title.invalid) return;

              onNext();
            }}
            className="w-full"
          >
            Next
          </Button>
        </DialogFooter>
      </div>
    );
  }

  if (steps === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          titleBefore="Now, set your price"
          title="price"
          subtitle="How much do you charge per night?"
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input
                  value={price}
                  onChange={(e) => {
                    setCustomValue("price", parseInt(e.target.value));
                  }}
                  type="number"
                  id="Price"
                  placeholder="price..."
                />
              </FormControl>
              <FormMessage className="pt-2 text-center" />
            </FormItem>
          )}
        />

        <DialogFooter>
          <div
            onClick={() => {
              if (!loading) onBack();
            }}
            className={cn(
              "w-full border-neutral-500 border cursor-pointer bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              { "opacity-60": loading }
            )}
          >
            Go back
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader className="border-b-[1px] pb-4">
          <DialogTitle className="text-center">
            <span className="text-primary">Homie</span> your home
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <RentBodyContent bodyContent={bodyContent} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
