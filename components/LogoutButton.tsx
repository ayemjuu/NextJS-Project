// "use client";

// import { logoutAction } from "../app/actions/auth.logout";
// import { BiLogOut } from "react-icons/bi";

// export default function LogoutButton() {
//   return (
//     <form action={logoutAction}>
//       <button
//         type="submit"
//         className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-900"
//       >
//         {/* Logout */}
//         <BiLogOut />
//       </button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { logoutAction } from "../app/actions/auth.logout";
import { CustomModal } from "@/components/CustomModal";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Logout icon button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-gray-900"
      >
        <BiLogOut />
      </button>

      {/* Confirmation Modal */}
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        title="Confirm logout"
        // description="Are you sure you want to log out?"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border px-3 py-1.5 text-sm"
            >
              Cancel
            </button>

            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-900"
              >
                Logout
              </button>
            </form>
          </div>
        }
      >
        {/* Optional body content */}
        <p className="text-sm text-muted-foreground">
          You will be signed out and redirected to the login page.
        </p>
      </CustomModal>
    </>
  );
}
