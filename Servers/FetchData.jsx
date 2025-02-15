'use client';

import { toast } from "react-toastify";
const FetchData = async (url, propertyKey) => {
  try {
    const response = await fetch(`/api/${url}`);
    const data = await response.json();
    if (data[propertyKey]) {
      return data[propertyKey]; 
    } else {
      toast.error('البيانات المستلمة غير صحيحة');
      return [];
    }
  } catch (error) {
    toast.error('حدث خطأ أثناء جلب البيانات');
    return [];
  }
};

export default FetchData;
