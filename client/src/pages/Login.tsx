import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  useAuthUsersQuery,
  useLoginMutation,
  useSignupMutation,
} from "@/queries/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  ChevronRight,
  LogIn,
  UserPlus,
  AlertCircle,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");

  const { theme, setTheme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();
  const activeMutation = mode === "login" ? loginMutation : signupMutation;
  const loading = activeMutation.isPending;

  const usersQuery = useAuthUsersQuery(mode === "login");
  const users = Array.isArray(usersQuery.data) ? usersQuery.data : [];

  useEffect(() => {
    const key = "sql_arena_auth_notice";
    const msg = sessionStorage.getItem(key);
    if (msg) {
      sessionStorage.removeItem(key);
      toast.info("Login required", { description: msg });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setError("");

    try {
      const trimmed = username.trim();
      const data = await activeMutation.mutateAsync(trimmed);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.error || err.message);
    }
  };

  const handleModeChange = (value) => {
    setMode(value);
    setError("");
    setUsername("");
    loginMutation.reset();
    signupMutation.reset();
  };

  const handleQuickLogin = async (u: any) => {
    try {
      setError("");
      const data = await loginMutation.mutateAsync(String(u.username));
      login(data);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden animate-in fade-in duration-1000 px-6">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-6 right-6 p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-lg hover:scale-110 active:scale-95 group z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle themes"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-amber-500 transition-transform group-hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 transition-transform group-hover:-rotate-12" />
        )}
      </button>

      <div className="w-full max-w-md space-y-8 text-center relative z-10">
        {/* Logo and Welcome */}
        <div className="space-y-4">
          <img src="/favicon.svg" alt="SQL Arena" className="w-30 h-30 mx-auto" />
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              SQL{" "}
              <span className="text-blue-600 dark:text-blue-400">Arena</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Master the art of query optimization
            </p>
          </div>
        </div>

        <Tabs
          defaultValue="login"
          className="w-full block"
          onValueChange={handleModeChange}
        >
          <TabsList className="grid-cols-2 mb-6 p-2 bg-slate-100 dark:bg-slate-900">
            <TabsTrigger
              value="login"
              className="py-2 px-4 data-[active]:bg-white data-[active]:text-blue-600 dark:data-[active]:bg-slate-800 dark:data-[active]:text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="py-2 px-4 data-[active]:bg-white data-[active]:text-blue-600 dark:data-[active]:bg-slate-800 dark:data-[active]:text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-slate-200 dark:border-slate-800 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
              <CardHeader className="text-left space-y-1">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  Welcome Back
                </CardTitle>
                <CardDescription>
                  Enter your username to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!usersQuery.isLoading && users.length ? (
                  <div className="mb-6 space-y-3 text-left">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                        login as
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {users.slice(0, 20).map((u: any) => (
                        <Button
                          key={u.id}
                          type="button"
                          variant="outline"
                          className="h-10 capitalize justify-center rounded-full border-slate-200 dark:border-slate-800 bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-semibold"
                          onClick={() => handleQuickLogin(u)}
                          disabled={loading}
                        >
                          {u.username}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {users.length ? (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    <span className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                      or
                    </span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2 text-left">
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <Input
                        id="username-login"
                        placeholder="Username"
                        className="pl-10 h-12 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    {error && (
                      <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-100 dark:border-red-900/50 animate-in slide-in-from-top-1">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Login to Arena
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-slate-200 dark:border-slate-800 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
              <CardHeader className="text-left space-y-1">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  Create Account
                </CardTitle>
                <CardDescription>
                  Pick a unique username to start your journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2 text-left">
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <Input
                        id="username-signup"
                        placeholder="Choose a username"
                        className="pl-10 h-12 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    {error && (
                      <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-100 dark:border-red-900/50 animate-in slide-in-from-top-1">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Get Started
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-xs text-slate-400 dark:text-slate-600">
          Your data will be saved on the local server linked to your username.
        </p>
      </div>
    </div>
  );
}
