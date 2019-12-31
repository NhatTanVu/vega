USE [vega]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/31/2019 1:59:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Features]    Script Date: 12/31/2019 1:59:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Features](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Features] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Makes]    Script Date: 12/31/2019 1:59:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Makes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Makes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Models]    Script Date: 12/31/2019 1:59:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Models](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[MakeId] [int] NOT NULL,
 CONSTRAINT [PK_Models] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Photos]    Script Date: 12/31/2019 1:59:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Photos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FileName] [nvarchar](255) NOT NULL,
	[VehicleId] [int] NULL,
 CONSTRAINT [PK_Photos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleFeatures]    Script Date: 12/31/2019 1:59:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleFeatures](
	[VehicleId] [int] NOT NULL,
	[FeatureId] [int] NOT NULL,
 CONSTRAINT [PK_VehicleFeatures] PRIMARY KEY CLUSTERED 
(
	[VehicleId] ASC,
	[FeatureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicles]    Script Date: 12/31/2019 1:59:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ModelId] [int] NOT NULL,
	[IsRegistered] [bit] NOT NULL,
	[ContactName] [nvarchar](255) NOT NULL,
	[ContactEmail] [nvarchar](255) NULL,
	[ContactPhone] [nvarchar](255) NOT NULL,
	[LastUpdated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Vehicles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190522232146_InitialModel', N'2.2.4-servicing-10062')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190522232423_ApplyConstraints', N'2.2.4-servicing-10062')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190522235916_SeedDatabase', N'2.2.4-servicing-10062')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190629145609_FeatureModel', N'2.2.4-servicing-10062')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190629150208_SeedFeatures', N'2.2.4-servicing-10062')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190707084227_AddVehicle', N'2.2.4-servicing-10062')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190929102958_AddPhoto', N'2.2.4-servicing-10062')
GO
SET IDENTITY_INSERT [dbo].[Features] ON 
GO
INSERT [dbo].[Features] ([Id], [Name]) VALUES (4, N'Feature1')
GO
INSERT [dbo].[Features] ([Id], [Name]) VALUES (5, N'Feature2')
GO
INSERT [dbo].[Features] ([Id], [Name]) VALUES (6, N'Feature3')
GO
SET IDENTITY_INSERT [dbo].[Features] OFF
GO
SET IDENTITY_INSERT [dbo].[Makes] ON 
GO
INSERT [dbo].[Makes] ([Id], [Name]) VALUES (4, N'Make1')
GO
INSERT [dbo].[Makes] ([Id], [Name]) VALUES (5, N'Make2')
GO
INSERT [dbo].[Makes] ([Id], [Name]) VALUES (6, N'Make3')
GO
SET IDENTITY_INSERT [dbo].[Makes] OFF
GO
SET IDENTITY_INSERT [dbo].[Models] ON 
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (10, N'Make1-ModelA', 4)
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (11, N'Make1-ModelB', 4)
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (12, N'Make1-ModelC', 4)
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (13, N'Make2-ModelA', 5)
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (14, N'Make2-ModelB', 5)
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (15, N'Make2-ModelC', 5)
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (16, N'Make3-ModelA', 6)
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (17, N'Make3-ModelB', 6)
GO
INSERT [dbo].[Models] ([Id], [Name], [MakeId]) VALUES (18, N'Make3-ModelC', 6)
GO
SET IDENTITY_INSERT [dbo].[Models] OFF
GO
ALTER TABLE [dbo].[Models]  WITH CHECK ADD  CONSTRAINT [FK_Models_Makes_MakeId] FOREIGN KEY([MakeId])
REFERENCES [dbo].[Makes] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Models] CHECK CONSTRAINT [FK_Models_Makes_MakeId]
GO
ALTER TABLE [dbo].[Photos]  WITH CHECK ADD  CONSTRAINT [FK_Photos_Vehicles_VehicleId] FOREIGN KEY([VehicleId])
REFERENCES [dbo].[Vehicles] ([Id])
GO
ALTER TABLE [dbo].[Photos] CHECK CONSTRAINT [FK_Photos_Vehicles_VehicleId]
GO
ALTER TABLE [dbo].[VehicleFeatures]  WITH CHECK ADD  CONSTRAINT [FK_VehicleFeatures_Features_FeatureId] FOREIGN KEY([FeatureId])
REFERENCES [dbo].[Features] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[VehicleFeatures] CHECK CONSTRAINT [FK_VehicleFeatures_Features_FeatureId]
GO
ALTER TABLE [dbo].[VehicleFeatures]  WITH CHECK ADD  CONSTRAINT [FK_VehicleFeatures_Vehicles_VehicleId] FOREIGN KEY([VehicleId])
REFERENCES [dbo].[Vehicles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[VehicleFeatures] CHECK CONSTRAINT [FK_VehicleFeatures_Vehicles_VehicleId]
GO
ALTER TABLE [dbo].[Vehicles]  WITH CHECK ADD  CONSTRAINT [FK_Vehicles_Models_ModelId] FOREIGN KEY([ModelId])
REFERENCES [dbo].[Models] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [FK_Vehicles_Models_ModelId]
GO
