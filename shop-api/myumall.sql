/*
 Navicat Premium Data Transfer

 Source Server         : shuaige
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : myumall

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 25/03/2021 16:39:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '轮播图id',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '轮播图标题',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '轮播图图片地址',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '轮播图表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (2, '横穿大陆的契机', '/uploads/banner/3c4bd850-8ca8-11eb-9527-7dc67156d3d9.jpg', 1);

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '购物车主键',
  `uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `goodsid` int NOT NULL COMMENT '商品编号',
  `num` tinyint NOT NULL COMMENT '数量',
  `status` tinyint(1) NOT NULL COMMENT '选中状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid`(`uid`, `goodsid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '购物车表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类编号',
  `pid` smallint UNSIGNED NOT NULL COMMENT '上级分类编号',
  `catename` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名称',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类图片',
  `status` tinyint UNSIGNED NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品分类表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (5, 0, '三国第一猛将', '', 1);
INSERT INTO `category` VALUES (6, 5, '零陵上将邢道荣', '/uploads/category/9def73f0-8bd6-11eb-9b1d-c74eb1519ef7.png', 1);
INSERT INTO `category` VALUES (7, 5, '吕奉先', '/uploads/category/bc95bb70-8c94-11eb-b808-a9cca189ac9f.jfif', 1);
INSERT INTO `category` VALUES (8, 0, '张福旭的媳妇', '/uploads/category/c4d00e30-8c94-11eb-b808-a9cca189ac9f.jfif', 1);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品编号',
  `first_cateid` smallint UNSIGNED NOT NULL COMMENT '一级分类编号',
  `second_cateid` smallint NOT NULL COMMENT '二级分类编号',
  `goodsname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `market_price` decimal(10, 2) NOT NULL COMMENT '市场价格',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品图片',
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '商品描述',
  `specsid` int NOT NULL COMMENT '规格id',
  `specsattr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '规则属性值',
  `isnew` tinyint(1) NOT NULL COMMENT '是否新品1是2不是',
  `ishot` tinyint(1) NOT NULL COMMENT '是否热卖1是2不是',
  `status` tinyint(1) NOT NULL COMMENT '状态1启用2禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (2, 5, 6, '邢道荣', 7777.00, 8888777.00, '/uploads/c34f2470-8c9d-11eb-9527-7dc67156d3d9.png', '', 9, '四叶草之庇护,红兔之庇护,白象之庇护', 1, 1, 1);

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户编号',
  `phone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `password` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `randstr` char(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码随机串',
  `addtime` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '注册时间',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '会员表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES (1, '04296c70-8727-11eb-bd0b-a14e4d6c958b', '17693272965', '张福旭大帅比', 'b95c3c0b049a2cdb910ca41d71b7e15c', '7UH36', '1615988720823', 1);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` smallint NOT NULL COMMENT '上级菜单编号',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单图标',
  `type` tinyint(1) NOT NULL COMMENT '菜单类型1目录2菜单',
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单地址',
  `status` tinyint(1) NOT NULL COMMENT '菜单状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台菜单权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (10, 0, '系统管理', 'el-icon-s-operation', 1, '', 1);
INSERT INTO `menu` VALUES (11, 10, '菜单管理', '', 2, '/menu', 1);
INSERT INTO `menu` VALUES (13, 10, '角色管理', '', 2, '/roler', 1);
INSERT INTO `menu` VALUES (14, 10, '管理员管理', '', 2, '/manger', 1);
INSERT INTO `menu` VALUES (16, 0, '商城管理', 'el-icon-s-goods', 1, '', 1);
INSERT INTO `menu` VALUES (17, 16, '商品分类', '', 2, '/goodscate', 1);
INSERT INTO `menu` VALUES (18, 16, '商品规格', '', 2, '/goodsspecs', 1);
INSERT INTO `menu` VALUES (19, 16, '商品管理', '', 2, '/goods', 1);
INSERT INTO `menu` VALUES (20, 16, '轮播图管理', '', 2, '/banner', 1);
INSERT INTO `menu` VALUES (21, 16, '会员管理', '', 2, '/member', 1);
INSERT INTO `menu` VALUES (22, 16, '秒杀管理', '', 2, '/seck', 1);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `rolename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `menus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单权限 存放的是菜单编号，用逗号隔开',
  `status` tinyint(1) NOT NULL COMMENT '角色状态1正常2禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台用户角色表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (21, '超级管理员', '10,11,13,14,16,17,18,19,20,21,22', 1);
INSERT INTO `role` VALUES (22, '菜单管理员', '11', 1);
INSERT INTO `role` VALUES (23, '角色管理员', '13', 1);

-- ----------------------------
-- Table structure for seckill
-- ----------------------------
DROP TABLE IF EXISTS `seckill`;
CREATE TABLE `seckill`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '秒杀表id',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动名称',
  `begintime` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '秒杀开始时间',
  `endtime` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '秒杀结束时间',
  `first_cateid` smallint NOT NULL COMMENT '商品一级分类编号',
  `second_cateid` smallint NOT NULL COMMENT '商品二级分类编号',
  `goodsid` int NOT NULL COMMENT '商品编号',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '限时秒杀活动表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of seckill
-- ----------------------------
INSERT INTO `seckill` VALUES (1, '冰冷微茫的世界', '1616169600000', '1619712000000', 5, 6, 2, 1);

-- ----------------------------
-- Table structure for specs
-- ----------------------------
DROP TABLE IF EXISTS `specs`;
CREATE TABLE `specs`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '规格id',
  `specsname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '规格名称',
  `status` tinyint(1) NOT NULL COMMENT '规格状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品规格表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of specs
-- ----------------------------
INSERT INTO `specs` VALUES (6, '军神的隐秘财产', 1);
INSERT INTO `specs` VALUES (9, '幸运三角', 1);

-- ----------------------------
-- Table structure for specs_attr
-- ----------------------------
DROP TABLE IF EXISTS `specs_attr`;
CREATE TABLE `specs_attr`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '规格项编号',
  `specsid` int NOT NULL COMMENT '规格的specsid',
  `specsval` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '规格值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品规格明细表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of specs_attr
-- ----------------------------
INSERT INTO `specs_attr` VALUES (43, 6, '遗书');
INSERT INTO `specs_attr` VALUES (44, 6, '宝石');
INSERT INTO `specs_attr` VALUES (48, 9, '白象之庇护');
INSERT INTO `specs_attr` VALUES (49, 9, '四叶草之庇护');
INSERT INTO `specs_attr` VALUES (50, 9, '红兔之庇护');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '住建',
  `uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员编号',
  `roleid` smallint NOT NULL COMMENT '角色编号',
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `randstr` char(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '随机加密串',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid`(`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台管理员用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (9, '7c8b1e70-8b87-11eb-8f1a-599b8c888785', 21, '张福旭大帅比', '2f26083539d52aca3f06b726697eb366', 'tcgNA', 1);
INSERT INTO `user` VALUES (11, '568304f0-8cad-11eb-b861-dbd1dd2dff87', 21, '走走走', '1816305332c06f64de08bcca5f5e51d0', 'plS2C', 1);

SET FOREIGN_KEY_CHECKS = 1;
