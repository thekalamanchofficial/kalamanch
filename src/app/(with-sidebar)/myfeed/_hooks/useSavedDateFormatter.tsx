
 
 const useSavedDateFormatter = ()=> {
    const formatSavedDate = (isoDateString: string): string => {
        const date = new Date(isoDateString);
      
        // Format day with ordinal suffix
        const day = date.getDate();
        const dayWithSuffix = day + (
          day >= 11 && day <= 13 ? "th" :
          day % 10 === 1 ? "st" :
          day % 10 === 2 ? "nd" :
          day % 10 === 3 ? "rd" :
          "th"
        );
        // Format month
        const month = date.toLocaleString("default", { month: "long" });
      
        // Format year
        const year = date.getFullYear();
      
        return `${dayWithSuffix} ${month} ${year}`;
      };
    return {formatSavedDate};
    
 }
 export default useSavedDateFormatter;
