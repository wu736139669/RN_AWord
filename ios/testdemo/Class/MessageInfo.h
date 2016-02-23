//
//  MessageInfo.h
//  testdemo
//
//  Created by xmfish on 16/2/18.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <LKDBHelper.h>
#import "NSObject+LKDBHelper.h"
@interface MessageInfo : NSObject

@property(nonatomic, strong) NSString* title;
@property(nonatomic, strong) NSString* image;
@property(nonatomic, strong) NSString* infoKey;

-(NSDictionary*)dictionary;
-(NSString*)JSON;
@end
