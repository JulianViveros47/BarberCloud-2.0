import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCurrentUser, logout } from "@/services/authApi";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserProfileDialog({ open, onOpenChange }: UserProfileDialogProps) {
  const { t } = useTranslation(undefined, { i18n });
  const navigate = useNavigate();
  const user = getCurrentUser();
  const displayName = user?.email?.split("@")[0] || "Usuario";
  const role = user?.role ? user.role.replace(/_/g, " ") : "Sesion activa";

  const handleLogout = () => {
    logout();
    onOpenChange(false);
    toast.success("Sesion cerrada");
    navigate("/login", { replace: true });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <DialogTitle>{t("navCustomer.profileTitle")}</DialogTitle>
          <DialogDescription>
            Informacion del usuario y opciones disponibles, incluyendo cerrar sesion.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-muted">
            <User className="h-9 w-9 text-muted-foreground" />
          </div>
          <p className="font-semibold text-lg">{displayName}</p>
          <p className="text-sm text-muted-foreground">{user?.email || "Sin sesion activa"}</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{role}</p>
          <Button variant="destructive" className="mt-3" onClick={handleLogout}>
            {t("navCustomer.logout")}
          </Button>
        </div>

        <DialogClose className="absolute right-4 top-4">
          <span className="sr-only">Cerrar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
