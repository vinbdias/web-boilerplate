import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Card, FormField, Input } from "@/components";
import { useAuth } from "@/auth/AuthContext";
import { useState } from "react";
import "./LoginPage.css";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { status, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  if (status === "authenticated") {
    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/";
    return <Navigate to={from} replace />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await login(values.email, values.password);

    if (result.ok) {
      const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/";
      navigate(from, { replace: true });
    } else {
      setServerError(result.error.message);
    }
  });

  return (
    <div className="login-page">
      <Card title="Sign in">
        <form onSubmit={onSubmit} className="login-page__form" noValidate>
          {serverError && <Alert tone="danger">{serverError}</Alert>}

          <FormField label="Email" error={errors.email?.message} required>
            {(fieldProps) => (
              <Input
                {...fieldProps}
                type="email"
                autoComplete="email"
                placeholder="demo@example.com"
                {...register("email")}
              />
            )}
          </FormField>

          <FormField label="Password" error={errors.password?.message} required>
            {(fieldProps) => (
              <Input
                {...fieldProps}
                type="password"
                autoComplete="current-password"
                {...register("password")}
              />
            )}
          </FormField>

          <Button type="submit" loading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
