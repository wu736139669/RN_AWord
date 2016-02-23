//
//  MessageInfoManager.m
//  testdemo
//
//  Created by xmfish on 16/2/18.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "MessageInfoManager.h"
#import "MessageInfo.h"
#import <LKDBHelper.h>
#import "NSObject+LKDBHelper.h"
#import "UIView+React.h"
@implementation MessageInfoManager



RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getMessageArrWithCallBack:(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"getMessageArrWithCallBack");
  NSMutableArray* array = [MessageInfo searchWithWhere:nil orderBy:nil offset:0 count:MAXFLOAT];
  if (array) {
    NSMutableArray* resultArr = [NSMutableArray array];
    [array enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      
      [resultArr addObject:[obj dictionary]];
    }];
      callback(@[[NSNull null], resultArr]);
    
  }else{
    callback(@[@"no data", [NSNull null]]);
  }
  
}
RCT_EXPORT_METHOD(saveMessageWithKey:(NSString*)key withImage:(NSString*)image withTitle:(NSString*)title withCallBack:(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"saveMessageWithKey");
  MessageInfo* info = [[MessageInfo alloc] init];
  info.infoKey = key;
  info.image = image;
  info.title = title;

  
  BOOL ret = [MessageInfo insertWhenNotExists:info];
  if (ret) {
    callback(@[[NSNull null], @1]);
  }else{
    callback(@[@"unkonwerror", [NSNull null]]);
  }
}

RCT_EXPORT_METHOD(isExistWithKey:(NSString*)key withCallBack:(RCTResponseSenderBlock)callback)
{
  NSMutableArray* array = [MessageInfo searchWithWhere:@{@"infokey":key}];
  
  callback(@[[NSNull null], @(array.count>0?1:0)]);
}
RCT_EXPORT_METHOD(delWithKey:(NSString*)key withCallBack:(RCTResponseSenderBlock)callback)
{
  BOOL ret = [MessageInfo deleteWithWhere:@{@"infokey":key}];
  callback(@[[NSNull null], @(ret)]);
}
@end
