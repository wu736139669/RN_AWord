//
//  MessageInfo.m
//  testdemo
//
//  Created by xmfish on 16/2/18.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "MessageInfo.h"

@implementation MessageInfo
+(NSString *)getTableName
{
  return @"MessageInfo";
}
+ (NSString*)getPrimaryKey
{
  return @"infoKey";
}
-(NSDictionary*)dictionary
{
  return [NSDictionary dictionaryWithObjectsAndKeys:self.infoKey, @"id", self.title,@"title", self.image,@"imageurl",  nil];
}
-(NSString*)JSON
{
  return [NSString stringWithFormat:@"{'id':%@,'title':%@,'imageurl':%@}",self.infoKey,self.title,self.image];
}
@end
