import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSubmissions() {
  return (
    <div className="space-y-8">
      {recentSubmissions.map((submission, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={submission.avatar} alt="Avatar" />
            <AvatarFallback>{submission.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{submission.name}</p>
            <p className="text-sm text-muted-foreground">
              {submission.project}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {submission.hours} hours
          </div>
        </div>
      ))}
    </div>
  )
}

const recentSubmissions = [
  {
    name: "You",
    avatar: "/placeholder-avatar.jpg",
    project: "Project Alpha",
    hours: 8,
  },
  {
    name: "You",
    avatar: "/placeholder-avatar.jpg",
    project: "Project Beta",
    hours: 6.5,
  },
  {
    name: "You",
    avatar: "/placeholder-avatar.jpg",
    project: "Project Gamma",
    hours: 7.5,
  },
  {
    name: "You",
    avatar: "/placeholder-avatar.jpg",
    project: "Project Delta",
    hours: 8,
  },
  {
    name: "You",
    avatar: "/placeholder-avatar.jpg",
    project: "Project Epsilon",
    hours: 7,
  },
]