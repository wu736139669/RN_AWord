//
//  ASHUtilManager.m
//  testdemo
//
//  Created by xmfish on 16/2/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ASHUtilManager.h"
#import <UIKit/UIKit.h>
@implementation ASHUtilManager

RCT_EXPORT_MODULE();

//复制文本
RCT_EXPORT_METHOD(pasteWithText:(NSString*)text)
{
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
  pasteboard.string = text;
}
@end
