"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, RefreshCw, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    showPassword,
    setShowPassword,
    login,
  } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <Card className="w-full max-w-md border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900 transition-all duration-300">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all duration-200 hover:scale-105">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-center text-zinc-900 dark:text-zinc-50">
          Admin Sign In
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400 text-center text-sm">
          Enter your credentials to access the admin portal
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950/20 p-3.5 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/35 animate-in fade-in slide-in-from-top-2 duration-300">
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50 block mb-2.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9 bg-transparent h-10 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-50"
              />
            </div>
          </div>
          <div className="space-y-1.5 mb-4">
            <label htmlFor="password" className="text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50 block mb-2.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9 pr-9 bg-transparent h-10 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full flex justify-center items-center gap-2 h-10 transition-transform duration-100 active:scale-[0.99] cursor-pointer" disabled={loading}>
            {loading && <RefreshCw className="h-4 w-4 animate-spin text-current" />}
            Sign In
          </Button>
          <Link
            href="/register"
            className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors w-full text-center py-2 cursor-pointer"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
