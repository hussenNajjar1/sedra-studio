import axios from 'axios';
import { toast } from 'react-toastify';

export const CreateData = async (url, data, onSuccess, onError) => {
  try {
    const response = await axios.post(url, data);

    if (response.status === 200) {
      toast.success('تم الإرسال بنجاح');
      if (onSuccess) onSuccess(response.data);
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      if (onError) onError(error.response.data);
    } else {
      toast.error('حدث خطأ في الاتصال بالخادم');
      if (onError) onError({ message: 'حدث خطأ في الاتصال بالخادم' });
    }
  }
};
