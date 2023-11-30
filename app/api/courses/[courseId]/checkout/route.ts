import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Course, Purchase, StripeCustomer } from "@/model/Course";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await Course.find({_id : params.courseId});

    // const courseId = course[0]._id

    // console.log('this is the course : ')
    // console.log(courseId.toString())

    const purchase = await Purchase.find({
          userId: user.id,
          courseId: params.courseId
        
    });

    if (purchase.length > 0) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course[0].title,
            description: course[0].description!,
          },
          unit_amount: Math.round(course[0].price! * 100),
        }
      }
    ];

    // console.log('this is the line items : ')
    // console.log(line_items)

    let stripeCustomer = await StripeCustomer.find({userId: user.id,});

    // console.log('this is the stripeCustomer : ')
    // console.log(stripeCustomer)

    if (stripeCustomer.length === 0) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

     
      // console.log('this is the customer : ')
      // console.log(customer)  

      stripeCustomer = await StripeCustomer.create({
          userId: user.id,
          stripeCustomerId: customer.id,
      });
    }

    // console.log('this is the stripeCustomer : ')
    // console.log(stripeCustomer)

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer[0].stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course[0]._id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course[0]._id}?canceled=1`,
      metadata: {
        courseId: course[0]._id.toString(),
        userId: user.id,
      }
    });

    const courseID = session?.metadata?.courseId
    const userID = session?.metadata?.userId;

    console.log('this the metadata ')
    console.log(courseID)
    console.log('this the user ID ')
    console.log(userID)

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}