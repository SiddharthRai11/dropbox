import {pgTable,integer,boolean,uuid,text,timestamp} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files=pgTable("files",{
    id:uuid("id").defaultRandom().primaryKey(),
    //basic file and folder informtion
    name:text("name").notNull(),
    path:text("path").notNull(), // /document/resume/pdf
    size:integer("size").notNull(),
    type:text("type").notNull(),
    //storage information
    fileUrl:text("file_url").notNull(),
    thumbnailUrl:text("thumbnail_url"),
    //Ownership
    userId:text("user_id").notNull(),//For verification
    parentId:text("parent_id"),
    //file/folder flags
    isFolder:boolean("is_folder").default(false).notNull(),
    isStarred:boolean("is_starred").default(false).notNull(),
    isTrash:boolean("is_trash").default(false).notNull(),
    //Timestamps
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("time_stamp").defaultNow().notNull()

})
//Definig the self relation
export const fileRelations=relations(files,({one,many})=>({
    parent:one(files,{
        fields:[files.parentId],//Foreign key (id of the parent)
        references:[files.id] //Referencing the id of the parent(Primary key of the parent)
    }),
    children:many(files)
}))
//Type defination
export const File=typeof files.$inferSelect;
export const newFile=typeof files.$inferInsert;