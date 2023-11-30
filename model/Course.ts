import mongoose from "mongoose";
import { string } from "zod";

const { Schema } = mongoose;

const chapterSchema = new Schema({
  title: {
    type: String,
    required: true,
  }, 
  courseId : String , 
  description: String,
  video: String,
  position:Number,
  isPublished : Boolean ,  
  isFree : {
    type : Boolean , 
    default : false
  } ,  
})

const courseSchema = new Schema(
  { 
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }, 
    description: String,
    image: String,
    category: String,
    price:Number,
    attachement : String , 
    isPublished :{
      type : Boolean , 
      default : false
    } , 
    chapter : []      
  },
  { timestamps: true }
);

const progressSchema = new Schema({
  userId : String , 
  chapterId : String , 
  isCompleted : {
    type : String , 
    default : false 
  }
})

const purchaseSchema = new Schema({
  userId  : String , 
  courseId : String , 
})

const stripeCustomerSchema = new Schema({
  userId : String ,
  stripeCustomerId  : String 
} , 
{timestamps : true}
)





// Export the schemas individually
export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export const Chapter = mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);
export const Progress = mongoose.models.Progress || mongoose.model("Progress", progressSchema);
export const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);
export const StripeCustomer = mongoose.models.StripeCustomer || mongoose.model("StripeCustomer", stripeCustomerSchema);
// export const Attachment = mongoose.models.Attachment || mongoose.model("Attachment", attachementSchema);