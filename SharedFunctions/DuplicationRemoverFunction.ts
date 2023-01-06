export default function duplicationRemoverFunction<T>(array: T[]): T[] {
  var temp_arr = Array.from(new Set(array)).filter((each_element: any) => {
    return (
      each_element != undefined && each_element != "" && each_element != null
    );
  });

  return temp_arr;
}
