import React from "react";
import { Outlet, useLoaderData } from "react-router";
import Sidebar from "../Common/Sidebar/index";
import AuthProvider from "../../Contexts/authProvider";
import { Toaster } from "sonner";
function CMSLaout() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors/>
        <main id="application" className="flex gap-10 min-h-dvh bg-zinc-50">
          <Sidebar />
          <section className="container mx-auto  py-4" id="content">
            <Outlet />
          </section>
        </main>
    </AuthProvider>
  );
}

export default CMSLaout;
