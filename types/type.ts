import {
  Tenant,
  Lane,
  Prisma,
  Tag,
  Ticket,
  User,
} from '@prisma/client'
import {
  _getTicketsWithAllRelations,
  getPipelineDetails,
  getTicketsWithTags,
} from '../lib/queries'
import { prisma } from '../lib/prisma'
import { z } from 'zod'


export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[]
}

export type TicketAndTags = Ticket & {
  Tags: Tag[]
  user: User | null
  tenants: Tenant | null
}

export type LaneDetail = Lane & {
  Tickets: TicketAndTags[]
}

export const CreatePipelineFormSchema = z.object({
  name: z.string().min(1),
})

export const CreateFunnelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
})

export type PipelineDetailsWithLanesCardsTagsTickets = Prisma.PromiseReturnType<
  typeof getPipelineDetails
>

export const LaneFormSchema = z.object({
  name: z.string().min(1),
})

export type TicketWithTags = Prisma.PromiseReturnType<typeof getTicketsWithTags>

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/

export const TicketFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  value: z.string().refine((value) => currencyNumberRegex.test(value), {
    message: 'Value must be a valid price.',
  }),
})

export type TicketDetails = Prisma.PromiseReturnType<
  typeof _getTicketsWithAllRelations
>