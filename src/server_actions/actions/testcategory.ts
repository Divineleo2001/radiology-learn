"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import {
  InsertTestCategoryParams,
  UpdateReportTemplate,
} from "@/schema/testcategory";
import { cookies } from "next/headers";

// {
//     "id": 1,
//     "testName": "xray",
//     "testDuration": 15,
//     "equipmentId": 1,
//     "parentTestCategoryId": null,
//     "userId": 1,
//     "login": "admin",
//     "createdBy": "admin",
//     "createdDate": "2024-04-12T12:27:39Z",
//     "lastModifiedBy": "admin",
//     "lastModifiedDate": "2024-04-12T12:27:39Z"
//   },

const testCategoryUrl = process.env.BACKEND_URL + "/api/test-categories";
const userAuthToken = cookies().get("authToken")?.value;

const bearerToken = `Bearer ${userAuthToken}`;

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "e" in e) {
    const errAsStr = e.e as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTestCategory = () => revalidatePath("/test-categories");

export const createTestCategoryAction = async (
  values: InsertTestCategoryParams
) => {
  try {
    const response = await axios.post(
      testCategoryUrl,
      {
        testName: values.testName,
        equipmentId: values.equipmentId,
        
        parentTestCategoryId: values.parentTestCategoryId,
        testDuration: values.testDuration,
      },
      {
        headers: {
          Authorization: bearerToken,
        },
      }
    );
    if (response.status === 201) {
      revalidateTestCategory();
      return console.log("TestCategory added successfully");
    }
  } catch (e) {
    console.log(e);
    const errors = handleErrors(e);
    console.log(errors);
  }
};

export const deleteTestCategoryAction = async (id: number) => {
  try {
    const response = await axios.delete(testCategoryUrl + "/" + id, {
      headers: {
        Authorization: bearerToken,
      },
    });
    if (response.status === 204) {
      revalidateTestCategory();
      return console.log("TestCategory deleted successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};

// export const patchTestChildReport = async (
//   reportTemplate: UpdateReportTemplate
// ) => {
//   try {
//     const response = await axios.patch(
//       testCategoryUrl + "/" + reportTemplate.id,
//       reportTemplate,
//       {
//         headers: {
//           Authorization: bearerToken,
//         },
//       }
//     );
//     if (response.status === 200) {
//       revalidateTestCategory();
//       return "success";
//     }
//   } catch (e) {
//     return handleErrors(e);
//   }
// };

export const patchTestChildReport = async (
  reportTemplate: UpdateReportTemplate
) => {
  try {
    const response = await axios.patch(
      testCategoryUrl + "/" + reportTemplate.id,
      reportTemplate,
      {
        headers: {
          Authorization: bearerToken,
        },
      }
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        if (response.status === 200) {
          revalidateTestCategory();
          resolve("success");
        } else {
          resolve("error");
        }
      }, 2000); // Delay of 2 seconds
    });
  } catch (e) {
    return handleErrors(e);
  }
};