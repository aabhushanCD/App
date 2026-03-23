import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/authContext";
import React from "react";

const Account = () => {
  const { currentUser } = useAuth();

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-6 flex flex-col gap-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">Account Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage your personal information and preferences.
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border">
              {currentUser?.imageUrl ? (
                <img
                  src={currentUser.imageUrl}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <FieldGroup className="flex-1 flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input defaultValue={currentUser?.name} />
              </Field>

              <Field>
                <FieldLabel>Email Address</FieldLabel>
                <Input defaultValue={currentUser?.email} />
              </Field>
            </div>

            <Field>
              <FieldLabel>Bio</FieldLabel>
              <Textarea
                placeholder="Write something about yourself..."
                defaultValue={currentUser?.bio}
              />
            </Field>
          </FieldGroup>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Password & Security</h2>

          <FieldGroup className="grid md:grid-cols-3 gap-6">
            <Field>
              <FieldLabel>Current Password</FieldLabel>
              <Input type="password" placeholder="********" />
            </Field>

            <Field>
              <FieldLabel>New Password</FieldLabel>
              <Input type="password" placeholder="********" />
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input type="password" placeholder="********" />
            </Field>
          </FieldGroup>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="text-gray-500 mt-2">
            Control how you receive notifications.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Account;
            