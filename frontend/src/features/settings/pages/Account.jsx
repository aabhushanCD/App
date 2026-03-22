import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Account = () => {
  return (
    <main className="w-full min-h-screen">
      <div className="px-16  py-8 rounded flex flex-col gap-8">
        <div className="flex flex-col ">
          <h1 className="text-3xl font-medium">Account Settings</h1>
          <p className="text-gray-500">
            Manage your personal information and prefrences.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="w-30 h-30 border rounded-full  "></div>
          <FieldGroup className="w-200">
            <div className="flex gap-8">
              <Field>
                <FieldLabel>Full Name:</FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>Email Address:</FieldLabel>
                <Input />
              </Field>
            </div>
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <Textarea />
            </Field>
          </FieldGroup>
        </div>
        <div className="mt-16">
          <h1 className="font-medium text-2xl mb-4">Password & Security</h1>
          <FieldGroup className="w-200 ">
            <div className="flex gap-8  p-4 rounded">
              <Field>
                <FieldLabel>Current Password:</FieldLabel>
                <Input type="password" placeholder="*************" />
              </Field>

              <Field>
                <FieldLabel>New Password:</FieldLabel>
                <Input type="password" placeholder="*************" />
              </Field>
              <Field>
                <FieldLabel>Confirm Password:</FieldLabel>
                <Input type="password" placeholder="*************" />
              </Field>
            </div>
          </FieldGroup>
        </div>
      </div>
    </main>
  );
};

export default Account;
