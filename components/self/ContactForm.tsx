"use client";

import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

const ContactForm = () => {
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "d0b8bb8f-38a9-4860-922c-6d55c938527c");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      toast({
        variant: "default",
        title: "message sent successfully.",
        description: "I think will recieved you message!",
        duration: 5000,
      });
      console.log(result);
    }
  }

  return (
    <div className="h-full w-full p-6">
      <p className="text-xl md:text-2xl font-medium text-center">
        We'd love to hear from you! Please fill out the form below, and we'll
        get back to you as soon as possible.
      </p>

      <form className="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-primary"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="bg-primary-foreground outline-none mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-primary"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="bg-primary-foreground outline-none mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-primary"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="bg-primary-foreground outline-none mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          ></textarea>
        </div>

        <div className="mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
