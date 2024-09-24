import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleTheme } from "@/components/ui/toggleTheme";

export default async function Authentication() {
  return (
    <main className="flex items-center justify-center h-[100vh]">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Create account</TabsTrigger>
          <TabsTrigger value="password">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Username</Label>
                <Input id="name" placeholder="User name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input type="email" id="username" placeholder="User email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input id="username" placeholder="User password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Create account</Button> <ToggleTheme />
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input id="current" type="password" placeholder="User email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input id="new" type="password" placeholder="User password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Login</Button> <ToggleTheme />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
