public class MyHelloWorld {
 public static void applyDiscount(Account[] books) {
   for (Book__c b :books){
     b.Price__c *= 0.9;
   }
 }
}