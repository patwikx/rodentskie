import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Rental",
  },
  {
    value: "feature",
    label: "For Sale",
  },
  {
    value: "documentation",
    label: "Doormant Property",
  },
]

export const statuses = [
  {
    value: "backlog",
    label: "Under Renovation",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "For Sale",
    icon: CheckCircledIcon,
  },
  {
    value: "in progress",
    label: "For Lease",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Occupied",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Sold",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
