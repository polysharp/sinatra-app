import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

export default function UpdagradeCard() {
  return (
    <Card className="shadow-none group-data-[collapsible=icon]:hidden">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-sm">Subscribe to a Pro plan</CardTitle>
        <CardDescription>
          Opt-in to receive updates and news about the sidebar.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Button
          className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
          size="sm"
        >
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
}
