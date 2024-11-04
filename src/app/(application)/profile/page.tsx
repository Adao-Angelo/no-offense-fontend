import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { X } from "lucide-react";

export default function Profile() {
  return (
    <main className="pt-16 px-8">
      <div className="grid grid-column-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>John Doe</CardTitle>
              <X className=""></X>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>Lorem what say do not be are some not head no has bin</p>
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>John Doe</CardTitle>
              <X></X>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>Lorem what say do not be are some not head no has bin</p>
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>John Doe</CardTitle>
              <X></X>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>Lorem what say do not be are some not head no has bin</p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
