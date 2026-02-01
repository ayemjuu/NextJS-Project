"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Fragment } from "react";

type Permission = {
  id: string;
  action: string;
  module: string;
  submodule: string;
};

const ACTIONS = ["CREATE", "READ", "UPDATE", "DELETE"];

type Props = {
  permissions: Permission[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onToggleMany: (ids: string[], checked: boolean) => void;
};

export function PermissionTable({
  permissions,
  selectedIds,
  onToggle,
  onToggleMany,
}: Props) {
  /** group: module → submodule → action */
  const grouped = permissions.reduce(
    (acc, p) => {
      acc[p.module] ??= {};
      const sub = p.submodule || "_root";
      acc[p.module][sub] ??= {};
      acc[p.module][sub][p.action.toUpperCase()] = p;
      return acc;
    },
    {} as Record<string, Record<string, Record<string, Permission>>>,
  );

  const hasRealSubmodules = (subs: Record<string, any>) =>
    Object.keys(subs).some((s) => s !== "_root");

  function toPascalCase(str: string): string {
    return str
      .split(/[-_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        {/* HEADER */}
        <TableHeader>
          <TableRow>
            <TableHead>Module</TableHead>
            {ACTIONS.map((a) => (
              <TableHead key={a} className="text-center">
                {a}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {Object.entries(grouped).map(([module, submodules]) => {
            const realSubmodulesExist = hasRealSubmodules(submodules);

            // If no real submodules, show only the module row with action checkboxes
            if (!realSubmodulesExist) {
              // Collect all permission ids for each action under _root submodule
              const rootActions = submodules["_root"] || {};

              return (
                <TableRow key={module} className="bg-muted font-semibold">
                  {/* <TableCell>{module}</TableCell> */}
                  <TableCell>{toPascalCase(module)}</TableCell>

                  {ACTIONS.map((action) => {
                    const perm = rootActions[action];
                    if (!perm) return <TableCell key={action} />; // No checkbox if no permission

                    const checked = selectedIds.includes(perm.id);

                    return (
                      <TableCell key={action} className="text-center">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => onToggle(perm.id)}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }

            // If real submodules exist, show module row with grouped checkboxes, then submodule rows
            return (
              <Fragment key={module}>
                {/* MODULE ROW (action checkboxes grouped) */}
                <TableRow className="bg-muted font-semibold">
                  {/* <TableCell>{module}</TableCell> */}
                  <TableCell>{toPascalCase(module)}</TableCell>

                  {ACTIONS.map((action) => {
                    const ids = Object.values(submodules)
                      .flatMap((a) => Object.values(a))
                      .filter((p) => p.action.toUpperCase() === action)
                      .map((p) => p.id);

                    const checked =
                      ids.length > 0 &&
                      ids.every((id) => selectedIds.includes(id));

                    return (
                      <TableCell key={action} className="text-center">
                        {ids.length > 0 ? (
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(v) =>
                              onToggleMany(ids, Boolean(v))
                            }
                          />
                        ) : (
                          <TableCell key={action} /> // Empty cell if no permissions
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* SUBMODULE ROWS */}
                {Object.entries(submodules)
                  .filter(([sub]) => sub !== "_root")
                  .map(([submodule, actions]) => (
                    <TableRow key={`${module}-${submodule}`}>
                      <TableCell className="font-semibold pl-8">
                        {/* {submodule} */}
                        {toPascalCase(
                          submodule === "_root" ? module : submodule,
                        )}
                      </TableCell>

                      {ACTIONS.map((action) => {
                        const perm = actions[action];
                        if (!perm) return <TableCell key={action} />; // Skip checkbox if no permission

                        return (
                          <TableCell key={action} className="text-center">
                            <Checkbox
                              checked={selectedIds.includes(perm.id)}
                              onCheckedChange={() => onToggle(perm.id)}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
